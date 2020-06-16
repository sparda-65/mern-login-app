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
 * Pop GET
 */
popController.get = async (req, res, next) => {
const {user}=req;
const query={
    createdby:user._id
}

try {
    pop= await Pop.find(query); 
    return res.send({
        pop
    }); 
} catch (error) {
    next(error);
}
};

popController.update = async (req, res, next) => {
    const pop_id=req.params.pop_id;
    const {popname,zone,ville,createat}=req.body;
    const query={
        _id:pop_id
    }
    try {
        const saved=await Pop.update(query,{popname,zone,ville,createat});
        return res.send({
            success:true,
            saved
        });
    } catch (error) {
        next(error);
    }
};

popController.destroy = async (req, res, next) => {
    const pop_id=req.params.pop_id;
    const query={
        _id:pop_id
    }
    try {
        await Pop.deleteOne(query);
        return res.send({
            success:true
        });
    } catch (error) {
        next(error);
    }
};
module.exports = popController;