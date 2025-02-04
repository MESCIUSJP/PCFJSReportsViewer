import * as React from 'react';
import { Viewer } from '@mescius/activereportsjs-react';
import "@mescius/activereportsjs/pdfexport";
import "@mescius/activereportsjs/htmlexport";
import "@mescius/activereportsjs/xlsxexport";
import "@mescius/activereportsjs/tabulardataexport";
import "@mescius/activereportsjs-i18n";
import * as Core from "@mescius/activereportsjs/core";

//ライセンスキーを設定
Core.setLicenseKey("Your License Key");

// レポートビューアーのプロパティを定義するインターフェース
export interface IReportsViewerProps {
  ReportLayout?:string | null;
  ReportData?:string | null;
  ViewerWidth?: string;  
  ViewerHeight?: string;  
}

// レポートビューアーのクラス
export class ReportsViewer extends React.Component<IReportsViewerProps> {
  viewerRef: React.RefObject<Viewer> = React.createRef();

  /**
   * 接続文字列を生成する関数。
   * @param data - JSON形式のデータ
   * @returns 接続文字列
   */
  private getConnectionString(data: string | null): string {
      if (data === null) {
          console.warn('データがnullのため、空の接続文字列を返します。');
          return "jsondata={}";
      }
      try {
          return "jsondata=" + JSON.stringify(data);
      } catch (error) {
          console.error('JSON.stringifyでエラーが発生しました:', error);
          return "jsondata={}";
      }
  }
  
  /**
   * レポートを更新する関数。
   * Viewerにレポートレイアウト、レポートデータを設定し、表示を更新します。
   */
  private setReport(): void {
      if (this.viewerRef.current && this.props.ReportLayout) {
          const report = JSON.parse(JSON.stringify(this.props.ReportLayout));
          const reportData = this.props.ReportData ?? null;
          console.log("setReport:",report);
          this.setReportDataConnection(report, reportData);
          this.viewerRef.current.Viewer.open(report);
      }
  }

  /**
   * レポートのデータソースの接続プロパティを更新します。
   * データソースがJSONを使用し、接続文字列に"jsondata"が含まれている場合、
   * 提供されたレポートデータで接続文字列を更新します。
   * 条件が満たされない場合や、レポートに有効な接続プロパティがない場合は警告をログに記録します。
   *
   * @param report - データソースと接続プロパティを含むレポートオブジェクト。
   * @param reportData - 接続文字列の更新に使用するデータ。
   */
  private setReportDataConnection(report: { DataSources?: { ConnectionProperties?: { DataProvider?: string; ConnectString?: string } }[] } | null, reportData: string | null): void {
    try {
        if (report?.DataSources?.[0]?.ConnectionProperties) {
            const connectionProperties = report.DataSources[0].ConnectionProperties;
  
            if (
                connectionProperties?.DataProvider?.includes("JSON") &&
                connectionProperties?.ConnectString?.includes("jsondata")
            ) {
                connectionProperties.ConnectString = this.getConnectionString(reportData);
            } else {
                console.warn("接続プロパティが必要な条件を満たしていません。");
            }
        } else {
            console.warn("レポートに有効な接続プロパティがありません。");
        }
          
    } catch (error) {
        console.error("接続プロパティの更新中にエラーが発生しました:", error);        
    }
  }
  
  /**
   * コンポーネントのマウント時に呼び出されるReactライフサイクルメソッド。
   * 初期化処理を行います。
   */
  public componentDidMount(): void {
      console.log("componentDidMount:", this.props.ReportLayout);
      this.setReport();
  }
  
  /**
   * コンポーネントの更新時に呼び出されるReactライフサイクルメソッド。
   * プロパティの変更に応じて処理を更新します。
   */
  public componentDidUpdate(prevProps: IReportsViewerProps): void {
      console.log("componentDidUpdate:", this.props.ReportLayout);
      if (this.props.ReportLayout !== prevProps.ReportLayout || this.props.ReportData !== prevProps.ReportData) {
          this.setReport();
      }
  }
  
  /**
   * コンポーネントの描画を行うReactメソッド。
   * ビューアーのスタイルを設定し、表示を行います。
   */
  public render(): React.ReactNode {
      const viewerStyle = {
          width: this.props.ViewerWidth || '100%',
          height: this.props.ViewerHeight || '100vh'
      };
  
      return (
          <div id="viewer-host" style={viewerStyle}>
              <Viewer ref={this.viewerRef} language='ja'/>
          </div>
      )
  }
}