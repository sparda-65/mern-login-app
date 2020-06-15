const Pop = require('../models/pop.model.js');
const popController = {};

/**
 * Add Pop
 */
popController.create = async (req, res, next) => {
    const {popname,zone,ville,createat}=req.body;

    const newPop = new Pop({
        popname,
        zone,
        ville,
        createat,
        createdby:req.user,
    });
    try {
        const saved = await newPop.save();
        return res.send({
            success:true,
            pop:saved
        })
    } catch (error) {
        next(error);
    }

};

/**
 * Login Logic
 */

module.exports = popController;