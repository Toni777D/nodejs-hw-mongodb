import {SORT_ORDER} from "../constans/index.js";

const parseSortParams = ({sortBy, sortFields, sortOrder}) => {
    const parsedSortBy = sortFields.includes(sortBy) ? sortBy : "name";
    const parsedSortOrder = SORT_ORDER.includes(sortOrder) ? sortOrder : SORT_ORDER[0];

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };

};

export default parseSortParams;
