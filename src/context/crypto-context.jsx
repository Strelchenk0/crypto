import { createContext, useEffect, useState, useContext} from "react";
import { fakeFetchCrypto, fetchAssets } from '../api';
import { persentDefference, totalAmount} from '../utils';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function ContextProvider({ children }) {

    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);


        useEffect(() => {
        async function preload() {
            setLoading(true);
            const { result } = await fakeFetchCrypto();  
            const assets = await fetchAssets();

            setAssets(assets.map((asset) => {
                const coin = result.find((c) => c.id === asset.id)
                return {
                grow: asset.price < coin.price,
                growPercent: persentDefference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: totalAmount(asset.amount, coin.price, asset.price),

                ...asset,
                }
            })
            );

            setCrypto(result);
            setLoading(false);
        }
        preload()
        }, [])

    return <CryptoContext.Provider value={{ loading, crypto, assets }}> {children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}