import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/free-solid-svg-icons";

import {
    faTrash,
    faSignOutAlt,
    faPencil,
    faSpinner,
    faSquarePlus,
    faPhone,
    faEnvelope,
    faMapMarkedAlt,
    faLock
} from '@fortawesome/free-solid-svg-icons';

const Icons = () => {
    return library.add(
        faTrash,
        faSignOutAlt,
        faPencil,
        faSpinner,
        faSquarePlus,
        faPhone,
        faEnvelope,
        faMapMarkedAlt,
        faLock
    );
};

export default Icons;