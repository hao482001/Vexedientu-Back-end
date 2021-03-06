const path = require('path')

const {
    getParkingLotById,
    updateParkingLotById,
} = require('../../CRUD/parking_lot')

async function uploadSingle(request, response) {
    try {
        if (request.file) {
            const parkingLotId = request.params.id

            // Check if vehicle exists
            const dbParkingLot = await getParkingLotById(parkingLotId)
            if (dbParkingLot) {
                // Update parking lot avatar in database
                const extName = path.extname(request.file.originalname)
                const imageUrl = `public/images/avatars/parking-lot/${parkingLotId}${extName}`
                const updateParkingLot = {
                    avatar: imageUrl,
                }
                updateParkingLotById(updateParkingLot, dbParkingLot.id).then(
                    () => {
                        return response.status(200).json({
                            message:
                                "Upload parking lot's avatar successfully!",
                            url: imageUrl,
                        })
                    },
                )
            } else {
                return response.status(404).json({
                    message: 'Parking lot not found!',
                })
            }
        } else {
            return response.status(400).json({
                message: 'Image file not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = uploadSingle
