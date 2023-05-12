/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LobbyCreateFormInputValues = {};
export declare type LobbyCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LobbyCreateFormOverridesProps = {
    LobbyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type LobbyCreateFormProps = React.PropsWithChildren<{
    overrides?: LobbyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LobbyCreateFormInputValues) => LobbyCreateFormInputValues;
    onSuccess?: (fields: LobbyCreateFormInputValues) => void;
    onError?: (fields: LobbyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LobbyCreateFormInputValues) => LobbyCreateFormInputValues;
    onValidate?: LobbyCreateFormValidationValues;
} & React.CSSProperties>;
export default function LobbyCreateForm(props: LobbyCreateFormProps): React.ReactElement;
