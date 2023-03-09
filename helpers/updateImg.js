const fs = require('fs')
const User = require('../models/User')
const Hospital = require('../models/Hospital')
const Medic = require('../models/Medic')

const deleteOldImg = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
}

const updateImg = async (table, id, newFilename) => {
  let oldPath
  switch (table) {
    case 'users':
      const user = await User.findById(id)
      if (!user) {
        return false
      }
      oldPath = `./uploads/users/${user.img}`
      deleteOldImg(oldPath)
      user.img = newFilename
      await user.save()
    	break
    case 'medics':
    	const medic = await Medic.findById(id)
    	if (!medic) {
    		return false
    	}
    	oldPath = `./uploads/medics/${medic.img}`
      deleteOldImg(oldPath)
      medic.img = newFilename
      await medic.save()
    	break
    case 'hospitals':
      const hospital = await Hospital.findById(id)
      if (!hospital) {
        return false
      }
      oldPath = `./uploads/hospitals/${hospital.img}`
      deleteOldImg(oldPath)
      hospital.img = newFilename
      await hospital.save()
    	break
  }
}

module.exports = {
  updateImg
}
