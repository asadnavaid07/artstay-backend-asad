import { Router } from 'express';
import { 
    getLanguageServiceById,
    getAllLanguageServices,
    getLanguageServiceFilters,
    toggleLanguageServiceStatus,
    languageApplicationStatus,
    createLanguageBooking,
    findLanguageExploration
} from '~/controllers/language.controller';

const router = Router();

router.get('/all', getAllLanguageServices);
router.get('/filters', getLanguageServiceFilters);
router.get('/application-status/:accountId',languageApplicationStatus)
router.get('/:languageServiceId', getLanguageServiceById);

router.post('/create-booking',createLanguageBooking)
router.post('/find-language-exploration', findLanguageExploration);
router.patch('/toggle-status', toggleLanguageServiceStatus);

export const languageRouter = router;