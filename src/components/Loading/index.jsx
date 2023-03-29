import { memo } from "react";

function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <img src="/img/loading.gif" alt="loading" width={60}/>
        </div>
    );
}

export default memo(Loading);