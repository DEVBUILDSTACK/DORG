/* <----- Editor Types -----> */

export type EditorBlock = {
    id: string;
    type: string;
    data: Record<string, any>;
};

/* <----- Image Types -----> */
export type ImageMetaDataType = {
    id: string;
    name: string;
    url: string;
};
