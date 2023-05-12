/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GameRoom } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameRoomUpdateFormInputValues = {
    open?: boolean;
    rating?: number;
};
export declare type GameRoomUpdateFormValidationValues = {
    open?: ValidationFunction<boolean>;
    rating?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameRoomUpdateFormOverridesProps = {
    GameRoomUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    open?: PrimitiveOverrideProps<SwitchFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GameRoomUpdateFormProps = React.PropsWithChildren<{
    overrides?: GameRoomUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gameRoom?: GameRoom;
    onSubmit?: (fields: GameRoomUpdateFormInputValues) => GameRoomUpdateFormInputValues;
    onSuccess?: (fields: GameRoomUpdateFormInputValues) => void;
    onError?: (fields: GameRoomUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameRoomUpdateFormInputValues) => GameRoomUpdateFormInputValues;
    onValidate?: GameRoomUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GameRoomUpdateForm(props: GameRoomUpdateFormProps): React.ReactElement;
