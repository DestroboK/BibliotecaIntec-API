const { response }= require('express');
const Usuario = require('../models//Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/JWT');


const crearUsuario = async (req,res) =>{

    const {
        name, 
        last_name, 
        birth_date,
        cedula, 
        passport, 
        phone_number,
        address,
        postal_code,
        email,
        password,
        sanctioned,
        role
        } = req.body;
    try{
        //Verificar el email

        let usuario = await Usuario.findOne({email});
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya se ha creado un usuario con este correo.'
            })
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario (req.body);
        //Encriptar la clave usando hash
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);
        //Generar JWT
        const token = await generarJWT(dbUser.id, name);

        //Crear usuario en la  BD
        await dbUser.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            token: token
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error creando usuario',
        })
    }
};


const loginUsuario = async (req,res = response) =>{
    const {email, password} = req.body;
    try{
        const dbUser = await Usuario.findOne({ email });
        if (!dbUser){
            return res.status(400).json({
                ok:false,
                msg: 'El correo es invalido'
            })
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'La clave es invalida.'
            })
        }

        //Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servicio
        return res.json({
            ok:true,
            uid: dbUser.uid,
            name: dbUser.name,
            role: dbUser.role,
            token: token
        })
    }
    catch(error){
        return res.status(500).json({
            ok: true,
            msg: 'Error fatal logueando'
        })
    }
};

const validarToken = async (req,res =response) =>{

    const{ uid, name} =req;
    let user = await Usuario.findById(uid);
    const token = await generarJWT(uid, name);
    return res.json({
        ok: true,
        msg: 'Renew',
        uid: uid,
        name: name,
        role: user.role,
        token: token
    })
};


module.exports={
    crearUsuario,
    loginUsuario,
    validarToken
}