import { Hono } from 'hono';
import CompanyController from '../controllers/companyController';

const companyRouter = new Hono();
const companyController = new CompanyController();

companyRouter.get('/seed', companyController.seedCompaniesDummyData);
companyRouter.post('/', companyController.addCompany);
companyRouter.get('/', companyController.getAllCompanies);
companyRouter.get('/:id', companyController.getCompanyById);
companyRouter.patch('/:id', companyController.updateCompany);
companyRouter.delete('/:id', companyController.removeCompany);


export default companyRouter;
