import React, { useState } from "react";

function useModel(props: PropsType) {
    const { initialValue } = props;
    const [value, setValue] = useState(initialValue);

    const onChange = (e: any) => {
        setValue(e.target.value);
    };

    return [value, onChange];
}

interface PropsType {
    initialValue: unknown;
}

export default useModel;
