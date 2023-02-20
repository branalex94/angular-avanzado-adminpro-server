const fs = require('fs')
const User = require('../models/User')
const Hospital = require('../models/Hospital')
const Medic = require('../models/Medic')

const updateImg = async (table, id, newFilename) => {
  switch (table) {
    case 'users':

    	break
    case 'medics':
    	const medic = await Medic.findById(id)
    	if (!medic) {
    		return false
    	}
    	const oldPath = `./uploads/medics/${medic.img}`
      if(fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath)
      }
      medic.img = newFilename
      await medic.save()
    	break
    case 'hospitals':
    	break
  }
}

module.exports = {
	updateImg
}
