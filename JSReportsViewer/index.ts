import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ReportsViewer, IReportsViewerProps } from "./ReportsViewer";
import * as React from "react";

/**
 * JSON文字列を安全にパースし、結果のオブジェクトを返します。
 * パースに失敗した場合、警告メッセージをログに記録し、nullを返します。
 *
 * @template T - パースされたオブジェクトの期待される型。
 * @param {string} json - パースするJSON文字列。
 * @returns {T | null} - パースされた型Tのオブジェクト、またはパースに失敗した場合はnull。
 */
const safeParseJSON = <T>(json: string): T | null => {
    try {
        return JSON.parse(json) as T;
    } catch {
        console.warn('JSONのパースに失敗しました。');
        return null;
    }
};

export class JSReportsViewer implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    protected props: IReportsViewerProps = {
        ReportLayout: null,
        ReportData: null,
        ViewerWidth: '100%',
        ViewerHeight: '100vh'
    };
        
    /**
     * 空のコンストラクタ。
     */
    constructor() { }

    /**
     * コントロールインスタンスを初期化するために使用されます。ここでリモートサーバー呼び出しやその他の初期化アクションを開始できます。
     * データセットの値はここでは初期化されません。updateView を使用してください。
     * @param context Context Object を介してコントロールで利用可能なすべてのプロパティバッグ。カスタマイザーによって設定された値がマニフェストで定義されたプロパティ名にマッピングされ、ユーティリティ関数も含まれます。
     * @param notifyOutputChanged コントロールが非同期で取得可能な新しい出力を持っていることをフレームワークに通知するためのコールバックメソッド。
     * @param state 単一ユーザーの1つのセッションで永続化するデータ。Mode インターフェースで 'setControlState' を呼び出すことで、コントロールのライフサイクルの任意の時点で設定できます。
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.props.ReportLayout = safeParseJSON(context.parameters.ReportLayout.raw ?? '');
        this.props.ReportData =safeParseJSON(context.parameters.ReportData.raw??'');
        this.props.ViewerWidth =context.parameters.ViewerWidth.raw??'100%';
        this.props.ViewerHeight =context.parameters.ViewerHeight.raw??'100vh';      
    }

    /**
     * プロパティバッグ内の任意の値が変更されたときに呼び出されます。これには、フィールド値、データセット、コンテナの高さや幅、オフライン状態、ラベルや可視性などのコントロールメタデータ値が含まれます。
     * @param context Context Object を介してコントロールで利用可能なすべてのプロパティバッグ。カスタマイザーによって設定された値がマニフェストで定義された名前にマッピングされ、ユーティリティ関数も含まれます。
     * @returns コントロールのルート React 要素
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this.props.ReportLayout = safeParseJSON(context.parameters.ReportLayout.raw ?? '');
        this.props.ReportData =safeParseJSON(context.parameters.ReportData.raw??'');
        this.props.ViewerWidth =context.parameters.ViewerWidth.raw??'100%';
        this.props.ViewerHeight =context.parameters.ViewerHeight.raw??'100vh';      
        return React.createElement(
            ReportsViewer, this.props
        );
    }

    /**
     * コントロールが新しいデータを受け取る前にフレームワークによって呼び出されます。
     * @returns マニフェストで定義された命名規則に基づくオブジェクト。"bound" または "output" としてマークされたプロパティに期待されるオブジェクト
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * コントロールがDOMツリーから削除されるときに呼び出されます。この呼び出しを使用してクリーンアップを行うべきです。
     * 例: 保留中のリモート呼び出しのキャンセル、リスナーの削除など。
     */
    public destroy(): void {
        // クリーンアップ処理を追加
        this.theComponent = null!;
        this.notifyOutputChanged = null!;
        this.props = null!;
    }
}
