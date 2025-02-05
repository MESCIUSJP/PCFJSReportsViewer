[日本語](#activereportsjs-pcf-コンポーネント-for-power-apps) | [English](#activereportsjs-pcf-component-for-power-apps) 
# ActiveReportsJS PCF コンポーネント for Power Apps

## 概要
このリポジトリには、Power Apps に ActiveReportsJS を統合するための Power Apps コンポーネント フレームワーク (PCF) コンポーネントが含まれています。

本コンポーネントを利用することで、Power Apps 内で高度な帳票作成が可能となります。ActiveReportsJS の機能を活用し、請求書やレポートなどの帳票を動的に生成し、Power Appsアプリからの印刷にも対応できます。

詳しい実装手順や解説については、以下の記事をご参照ください。

[ActiveReportsJSでつくる！PowerAppsの帳票コンポーネント（1）](https://devlog.mescius.jp/activereportsjs-powerapps-1/)

![activereportsjs-powerapps-1](https://github.com/user-attachments/assets/2746bf85-7341-4ee7-99f1-e31f3f5df634)



## 特徴
- Power Apps に ActiveReportsJS を埋め込む
- 動的にレポートをレンダリング
- スタイルや設定をカスタマイズ可能
- Power Appsアプリからの印刷に対応

## 前提条件
- Visual Studio Code
- Node.js
- Power Platform CLI
- Visual Studio 2022 の Build Tools
- [ActiveReportsJS V5.1J（v5.1.5）](https://www.npmjs.com/package/@mescius/activereportsjs/v/5.1.5)

## インストール
```sh
npm install
```

## 使用方法
```sh
npm start
```

## デプロイ
```sh
npm run build
```

## ライセンス
このプロジェクトは ActiveReportsJS のライセンス条件に従います。デプロイ前に適切なライセンスを取得してください。

[日本語](#activereportsjs-pcf-コンポーネント-for-power-apps) | [English](#activereportsjs-pcf-component-for-power-apps) 
# ActiveReportsJS PCF Component for Power Apps

## Overview
This repository contains a Power Apps Component Framework (PCF) component for integrating ActiveReportsJS into Power Apps.

By using this component, you can create advanced reports within Power Apps. ActiveReportsJS allows dynamic generation of invoices, reports, and other documents, with support for printing directly from Power Apps applications.

For detailed implementation steps and explanations, please refer to the following article:

[Create Reports with ActiveReportsJS for PowerApps (1)](https://devlog.mescius.jp/activereportsjs-powerapps-1/)

![activereportsjs-powerapps-1](https://github.com/user-attachments/assets/2746bf85-7341-4ee7-99f1-e31f3f5df634)

## Features
- Embed ActiveReportsJS into Power Apps
- Dynamically render reports
- Customize styles and settings
- Support for printing directly from Power Apps applications

## Prerequisites
- Visual Studio Code
- Node.js
- Power Platform CLI
- Visual Studio 2022 Build Tools
- [ActiveReportsJS V5.1J (v5.1.5)](https://www.npmjs.com/package/@mescius/activereportsjs/v/5.1.5)

## Installation
```sh
npm install
```

## Usage
```sh
npm start
```

## Deployment
```sh
npm run build
```

## License
This project complies with the licensing terms of ActiveReportsJS. Please ensure you have obtained the appropriate license before deployment.
