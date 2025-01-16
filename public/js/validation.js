export const TITLE_MAX = 26;
export const CONTENT_MAX = 500;

export const validateTitle = (titleValue) => {
    if(titleValue.trim().length > TITLE_MAX){
        return false;
    }else{
        return true;
    }
};

export const validatePostContent = (contentValue) => {
    if(contentValue.trim().length > CONTENT_MAX){
        return false;
    }else{
        return true;
    }
};

