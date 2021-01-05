const {auth} = require('../../../utils')


const getPayloadOrUndefined = (req, res, next) => {
    const header = req.headers;
    if (!header.authorization) {
        return next()
    }
    const authorization = header.authorization;
    if (!authorization.startsWith("Bearer")) {
        return next()
    }        
    const token = authorization.replace("Bearer ", '');
    req.token = auth.getPayLoad(token);
    next();
}

const hasToken = (req, res, next) =>{
    getPayloadOrUndefined(req,res,()=> {
    if(req.token === undefined ){
        res.status(403).json();
        return;
    }
    next()
    })
}

const hasRole = (...roles) => {

    return function (req, res, next){
        hasToken(req, res,()=> {
            if(roles.length === 0){
                next()
                return
            }
            for (let i = 0; i < roles.length; i++) {
                if( req.token.roles.includes(roles[i]) ){
                    next()
                    return
                }
            }
            res.status(403).json();
        })

    }
}



module.exports = {getPayloadOrUndefined,hasToken,hasRole}