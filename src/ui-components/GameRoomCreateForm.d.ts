/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameRoomCreateFormInputValues = {
    open?: boolean;
    rating?: number;
};
export declare type GameRoomCreateFormValidationValues = {
    open?: ValidationFunction<boolean>;
    rating?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameRoomCreateFormOverridesProps = {
    GameRoomCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    open?: PrimitiveOverrideProps<SwitchFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GameRoomCreateFormProps = React.PropsWithChildren<{
    overrides?: GameRoomCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GameRoomCreateFormInputValues) => GameRoomCreateFormInputValues;
    onSuccess?: (fields: GameRoomCreateFormInputValues) => void;
    onError?: (fields: GameRoomCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameRoomCreateFormInputValues) => GameRoomCreateFormInputValues;
    onValidate?: GameRoomCreateFormValidationValues;
} & React.CSSProperties>;
export default function GameRoomCreateForm(props: GameRoomCreateFormProps): React.ReactElement;
