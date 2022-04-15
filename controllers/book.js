const { response } = require("express");
const Libro = require('../models/Libro');

const crearLibro = async (req, res = response)=>{
    const {
        title, 
        img_url,
        author, 
        editorial,
        edition, 
        page_nums, 
        book_quantity,
        description,
        categories,
        publish_date
        } = req.body;
    try{


        let libro = await Libro.findOne({title});
        if( libro ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya se ha creado un libro con este titulo.'
            })
        }

        // Crear libro con el modelo
        const dbBook = new Libro (req.body);
        //Crear libro en la  BD
        await dbBook.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbBook.id,
            title: title
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creando libro',
        })
    }

}
const eliminarLibro = async (req, res = response)=>{
    const {
        _id
        } = req.body;
    try{
        //Verificar el email

        let libro = await Libro.findById({_id: _id});
        if(!libro ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este libro'
            })
        }
        else{
            await Libro.deleteOne({ _id: libro._id })
        }
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            title: libro.title,
            msg: "Se ha borrado el libro correctamente."
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error eliminando libro',
        })
    }
}
const getLibro = async (req, res = response)=>{
    const 
        _id
        = req.header('_id');
    try{

        let libro = await Libro.findById(_id);
        if(!libro ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado este libro'
        })
        }
        else{
            return res.json(libro)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo libro',
        })
    }

}
const getLibros = async (req, res = response)=>{
    try{
    let libros = await Libro.find()
    if(!libros ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay libros en la base de datos'
        })
    }
    else{
        return res.json(libros)
        
    }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo todos los libros',
        })
    }
}
const actualizarLibro = async (req, res = response)=>{
    try{
    const {
        _id,
        title, 
        img_url,
        author, 
        edition, 
        page_nums, 
        book_quantity,
        description,
        categories,
        publish_date
        } = req.body;

        let libro = await Libro.findById({_id: _id});
        if(!libro ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este libro'
            })
        }
        else{
            await Libro.updateOne({ _id: _id},{
                title: title,
                img_url: img_url,
                author: author,
                edition:edition,
                page_nums:page_nums,
                book_quantity: book_quantity,
                description: description,
                categories: categories,
                publish_date: publish_date
            })
            return res.status(201).json({
                ok:true,
                title: libro.title,
                msg: "Se ha actualizado el libro correctamente."
            })
        }
    }    
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error actualizando libro',
        })
    }
}

module.exports = {
    crearLibro,
    eliminarLibro,
    getLibro,
    getLibros,
    actualizarLibro
}