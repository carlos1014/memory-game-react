export interface Data {
    entries: Entries[];
    meta: Meta[];
}

export interface Entries {
    fields: Fields;
}
export interface Fields {
    images: Images;
}

export interface Images {
    title: string;
    url: string;
    uuid: string;
}

export interface NewImages {
    title: string;
    url: string;
    uuid: string;
}

export interface Meta {
    current_page: number;
    per_page: number;
    total_entries: number;
    total_pages: number

}
