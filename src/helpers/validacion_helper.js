
 export default class validacion
{
     validarEmail = (email) => {
       
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    validarProvincia = (longitude,latitude) =>
    {

        if(typeof(longitude) == 'string' || typeof(latitude) == 'string')
        {
            return "La longitud o la latitud no es un numeral";
        }
        else
        {
            return "Ok";
        }
    }

    ValidarCreacionEvento (max_assistance,CapacidadMax,price,duration_in_minutes) 
    {
        const capacida_max = parseInt(CapacidadMax);
        if(max_assistance > capacida_max)
        {
            return "La maxima asistencia no puede superar a la capacidad maxima";
        }
        else if (price < 0 && duration_in_minutes < 0)
        {
            return "El precio y la duracion en minutos debe ser mayor o igual a cero";
        }                           
        return "Ok";
    }

    ValidarInscripcionEvento(max_assistance,max_capacity,start_date)
    {
        if(max_assistance == max_capacity)
        {
            return "El evento ya no posee cupos";
        }
        else if(start_date < Date.now() || start_date == Date.now())
        {
            return "No puedes ingresar a un evento que ya ocurrio o que tiene lugar el dia de la fecha";
        }
        return "Ok";
    }

}

