
import BlockWrapper from "@/components/BlockWrapper";
import ProductsModule from "./Products";
import WarehousesModule from "./Warehouse";

export default function InventoryModule() {
    return (
        <>
            <BlockWrapper>
                <ProductsModule />
            </BlockWrapper>
            <BlockWrapper>
                <WarehousesModule />
            </BlockWrapper>
        </>

    );
}
