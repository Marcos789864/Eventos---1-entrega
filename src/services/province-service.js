import ProvinceRepositorie from './src/repostories/province-repository.js';

export default class ProvinceService{

    getAllAsync = async() =>
    {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {}
    createAsync = async (entity) => {}
    updateAsync = async (entity) => {}
    deleteByIdAsync = async (id) => {}
}