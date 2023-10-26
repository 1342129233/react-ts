import React from 'react';
export type FormItemType = 'input' | 'select' | 'datePicker';

export type SelectOptions = {
    label: string
    value: unknown
    disabled?: boolean
}

export type JsonFormConfig = {
    key: React.Key;
    value: unknown
    label: string
    hidden?: boolean
    remoteConfig?: {
        method: (val: unknown)=> void
        loading: boolean
    }
    format?: string;
    placeholder?: string;
    search?: {
        type: string;
        options?: Array<SelectOptions>;
        clearable?: boolean,
        placeholder?: string;
    },
    table?: {
        width: number;
        fixed?: string;
        render?: any
        label?: string;
    }
}

export type JsonSelectConfig = JsonFormConfig & { selectOptions: Array<SelectOptions> }

// export type JsonInputConfig = Omit<JsonFormConfig, 'selectOptions' | 'remoteConfig'>

export type JsonDatePickerConfig = JsonFormConfig & { pickerType?: string, getValueFromEvent: (value: any[]) => any, getValueProps: (value: any) => any }

export type EffectJsonFormConfig =  JsonSelectConfig | JsonDatePickerConfig; // JsonInputConfig
