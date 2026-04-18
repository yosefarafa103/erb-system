interface Attrs {
    getPathNameForBreadCrumb: (pathname: string) => string[]
}
export class GeneralUtils implements Attrs {
    constructor() {
    };
    getPathNameForBreadCrumb(p: string) {
        return p.split("/").filter((el) => !!el)
    }
}