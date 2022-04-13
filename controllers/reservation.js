const { response } = require("express");
const Libro = require("../models/Libro");
const Prestamo = require("../models/Prestamo");
const Usuario = require("../models/Usuario");


const crearReserv = async (req, res = response)=>{
    const {
        user_name, 
        book_id,
        emission_date, 
        final_date,
        book_quantity, 
        status
        } = req.body;
    try{

        let libro = await Libro.findById({_id: book_id});
        if( libro.book_quantity >= 0 ) {
            if(libro.book_quantity - book_quantity >= 0){                
                let user= await Usuario.find({name: user_name});
                if(user){
                // Crear libro con el modelo
                const dbReserv = new Prestamo (req.body);
                //Crear libro en la  BD
                await dbReserv.save();
                await Libro.updateOne({ _id: book_id},{
                    book_quantity: libro.book_quantity - book_quantity
                });
                //Generar respuesta exitosa
                return res.status(201).json({
                    ok:true,
                    uid: dbReserv.id,
                    title: "Se ha creado el nuevo prestamo."}
                )      
                }  
            }
            else{
                return res.status(400).json({
                    ok:false,
                    msg: "No tenemos suficientes copias de este libro"
                })
            }
        }
        else{
            return res.status(400).json({
                ok:false,
                msg: "Algo ha salido mal creando el prestamo."
            })
        }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creando el prestamo.',
        })
    }

}
const eliminarReserv = async (req, res = response)=>{
    const {
        uid
        } = req.body;
    try{

        let prestamo = await Prestamo.findById({_id: uid});
        if(!prestamo ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este prestamo'
            })
        }
        else{
            let libro = await Libro.findById({_id: prestamo.book_id});
            if(libro){
                await Prestamo.deleteOne({ _id: prestamo._id })
                await Libro.updateOne({ _id: prestamo.book_id},{
                    book_quantity: libro.book_quantity + prestamo.book_quantity
                });
            }
            else{
            await Prestamo.deleteOne({ _id: prestamo._id })
            }
        }
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            title: prestamo._id,
            msg: "Se ha borrado el prestamo correctamente."
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error eliminando prestamo',
        })
    }

}
const getReserv = async (req, res = response)=>{
    try{
        const {
            uid
            } = req.body;
    
        let prestamo = await Prestamo.findById({_id: uid});
        if(!prestamo ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este prestamo'
            })
        }
        else{
            return res.json(prestamo)
        }
    }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error obteniendo prestamo',
            })
        }
    
}
const getAllReserv = async (req, res = response)=>{
    try{
        let prestamos = await Prestamo.find()
        if(!prestamos ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay prestamos en la base de datos'
            })
        }
        else{
            return res.json(prestamos)
            
        }
        }
            catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error obteniendo todos los prestamos',
            })
        }
}
const actualizarReserv = async (req, res = response)=>{
    try{
        const {
            _id,
            status
            } = req.body;
    
            let prestamo = await Prestamo.findById({  _id: _id});
            if(!prestamo ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hemos encontrado este prestamo'
                });
            }
            if(status == 'Completado' || 'Denegado'){
                let libro = await Libro.findById({_id: prestamo.book_id});
                if(libro){
                    await Libro.updateOne({ _id: prestamo.book_id},{
                        book_quantity: libro.book_quantity + prestamo.book_quantity
                    });
                    await Prestamo.updateOne({ _id: _id},{
                        status: status
                    });
                    return res.status(201).json({
                        ok:true,
                        title: prestamo._id,
                        msg: "Se ha completado el ciclo de vida del prestamo."
                    });
                }
                else{
                    return res.status(201).json({
                        ok:true,
                        title: prestamo._id,
                        msg: "Se ha completado el ciclo de vida del prestamo. El libro no existe."
                    });
                }
            }
        else{
    await Prestamo.updateOne({ _id: _id},{
        status: status
    });
    return res.status(201).json({
        ok:true,
        title: prestamo._id,
        msg: "Se ha actualizado el estado del prestamo correctamente."
    });
}
            
        }    
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error actualizando prestamo',
            })
        }
}

module.exports = {
    crearReserv,
    eliminarReserv,
    getReserv,
    getAllReserv,
    actualizarReserv
}