import LocationRepository from '../repositories/locations-repository.js';

export default class ProvinceService
{
    getLocationsByIdProvince = async (id) => 
    {
        const repo = new LocationRepository();
        const Location = await repo.getLocationsByIdProvince(id);
        return Location;
    }
}