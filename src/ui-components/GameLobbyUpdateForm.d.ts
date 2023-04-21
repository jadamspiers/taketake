/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GameLobby } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameLobbyUpdateFormInputValues = {};
export declare type GameLobbyUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameLobbyUpdateFormOverridesProps = {
    GameLobbyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type GameLobbyUpdateFormProps = React.PropsWithChildren<{
    overrides?: GameLobbyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gameLobby?: GameLobby;
    onSubmit?: (fields: GameLobbyUpdateFormInputValues) => GameLobbyUpdateFormInputValues;
    onSuccess?: (fields: GameLobbyUpdateFormInputValues) => void;
    onError?: (fields: GameLobbyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameLobbyUpdateFormInputValues) => GameLobbyUpdateFormInputValues;
    onValidate?: GameLobbyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GameLobbyUpdateForm(props: GameLobbyUpdateFormProps): React.ReactElement;
