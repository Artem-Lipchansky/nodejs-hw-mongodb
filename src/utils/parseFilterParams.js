
const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isValidType = (contactType) => ['work', 'home', 'personal'].includes(contactType);
  
    if (isValidType(contactType)) return contactType;
  };
  
  
  
   const parseIsFavourite = (isFavourite) => {
    const isBoolean = isFavourite === 'true' || isFavourite === 'false';
  
    if (!isBoolean) return;
  
    return isFavourite === 'true' ? true : false;
  };
  
  
  export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
  
    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
  
  
    return {
      contactType: parsedContactType,
      isFavourite: parsedIsFavourite,
  
    };
  };