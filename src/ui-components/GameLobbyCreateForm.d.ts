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
export declare type GameLobbyCreateFormInputValues = {};
export declare type GameLobbyCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameLobbyCreateFormOverridesProps = {
    GameLobbyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type GameLobbyCreateFormProps = React.PropsWithChildren<{
    overrides?: GameLobbyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GameLobbyCreateFormInputValues) => GameLobbyCreateFormInputValues;
    onSuccess?: (fields: GameLobbyCreateFormInputValues) => void;
    onError?: (fields: GameLobbyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameLobbyCreateFormInputValues) => GameLobbyCreateFormInputValues;
    onValidate?: GameLobbyCreateFormValidationValues;
} & React.CSSProperties>;
export default function GameLobbyCreateForm(props: GameLobbyCreateFormProps): React.ReactElement;
