const { response } = require("express");
const Sancion = require("../models/Sancion");


const crearSanc = async (req, res = response)=>{
    const {
        user_id, 
        sanction_description,
        emission_date,
        sanction_time_days,
        } = req.body;
    try{


        let sanc = await Sancion.findOne({user_id});
        if( libro ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario ya está sancionado por' + sanction_time_days +' dias.' 
            })
        }

        // Crear libro con el modelo
        const dbSanc = new Sancion (req.body);
        //Crear libro en la  BD
        await dbSanc.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbSanc.id,
            time: sanction_time_days + ' dias de sancion.'
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error creando sancion',
            token: token
        })
    }
}
const eliminarSanc = async (req, res = response)=>{
    const {
        uid
        } = req.body;
    try{
        //Verificar el email

        let sanc = await Sancion.findById({_id: uid});
        if(!sanc ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado esta sancion'
            })
        }
        else{
            await Libro.deleteOne({ _id: sancion._id })
        }
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            title: libro.title,
            msg: "Se ha borrado la sancion correctamente."
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error eliminando sancion',
        })
    }
}
const getSanc = async (req, res = response)=>{
    try{
        const {
            uid
            } = req.body;
    
        let sanc = await Sancion.findById({_id: uid});
        if(!sanc ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado esta sancion'
            })
        }
        else{
            return res.json(sanc)
        }
    }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: true,
                msg: 'Error obteniendo sancion',
            })
        }
    
}
const getAllSancs = async (req, res = response)=>{
    try{
        let sancs = await Sancion.find()
        if(!sancs ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay sanciones en la base de datos'
            })
        }
        else{
            return res.json(sancs);
            
        }
        }
            catch (error){
            console.log(error);
            return res.status(500).json({
                ok: true,
                msg: 'Error obteniendo todas las anciones',
            })
        }
}
const actualizarSanc = async (req, res = response)=>{
    try{
        const {
            _id,
            status
            } = req.body;
    
            let sanc = await Sancion.findById({_id: _id});
            if(!sanc ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hemos encontrado esta sancion'
                })
            }
            else{
                await Sancion.updateOne({ _id: _id},{
                    status: status
                })
                return res.status(201).json({
                    ok:true,
                    title: sanc._id,
                    msg: "Se ha actualizado el estado del prestamo correctamente."
                })
            }
        }    
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: true,
                msg: 'Error actualizando prestamo',
            })
        }
}

module.exports = {
    crearSanc,
    eliminarSanc,
    getSanc,
    getAllSancs,
    actualizarSanc
}