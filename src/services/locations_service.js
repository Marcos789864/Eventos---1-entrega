import LocationRepository from '../repositories/locations_repository.js';

export default class ProvinceService
{
    getLocationsByIdProvince = async (id) => 
    {
        const repo = new LocationRepository();
        const Location = await repo.getLocationsByIdProvince(id);
        return Location;
    }

    getAllLocations = async() =>
    {
        const repo = new LocationRepository();
        const Location = await repo.getAllLocations();
        return Location;
    }
}