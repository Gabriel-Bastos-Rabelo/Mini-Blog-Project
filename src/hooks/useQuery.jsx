import { useLocation } from "react-router-dom";

import { useMemo } from "react";

export function useQuery(){
    const {search} = useLocation();

    console.log(search)


    return useMemo(() => new URLSearchParams(search), [search])

}
