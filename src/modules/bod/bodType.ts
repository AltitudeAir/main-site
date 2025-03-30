export interface BODsType {
    id: number;
    director?: string;
    position?: string;
    image?: string;
    fname?: string;
    lname?: string;
}

export interface BODMessageType {
    id: number;
    introduction?: string | undefined;
    content?: string | undefined;
    image?: string | undefined;
}