/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Lobby } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LobbyUpdateFormInputValues = {};
export declare type LobbyUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LobbyUpdateFormOverridesProps = {
    LobbyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type LobbyUpdateFormProps = React.PropsWithChildren<{
    overrides?: LobbyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    lobby?: Lobby;
    onSubmit?: (fields: LobbyUpdateFormInputValues) => LobbyUpdateFormInputValues;
    onSuccess?: (fields: LobbyUpdateFormInputValues) => void;
    onError?: (fields: LobbyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LobbyUpdateFormInputValues) => LobbyUpdateFormInputValues;
    onValidate?: LobbyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LobbyUpdateForm(props: LobbyUpdateFormProps): React.ReactElement;
