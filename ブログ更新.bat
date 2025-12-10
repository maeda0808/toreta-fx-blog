@echo off
chcp 65001 > nul
cd /d "c:\Users\maeda\Desktop\FX_HP\toreta-fx-blog"

echo ==========================================
echo  ブログ記事をインターネットに公開します...
echo  (GitHubへデータを送信中)
echo ==========================================

:: 変更をステージング
git add .

:: コミット（現在日時をメッセージに入れる）
set mydate=%date:/=-%
set mytime=%time: =0%
set mytime=%mytime:~0,2%%mytime:~3,2%
set commit_msg=Content Update %mydate%-%mytime%

git commit -m "%commit_msg%"

:: 前回のコミットから変更がない場合のメッセージ
if %ERRORLEVEL% equ 1 (
    echo.
    echo ★変更されたファイルが見つかりませんでした。
    echo   先に管理画面で「SAVE」を押しましたか？
    echo.
    pause
    exit /b
)

:: プッシュ
echo.
echo データを送信しています...
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==========================================
    echo  ✅ 更新が完了しました！
    echo  数分後にブログに記事が表示されます。
    echo ==========================================
) else (
    echo.
    echo ==========================================
    echo  ❌ エラーが発生しました。
    echo  インターネット接続などを確認してください。
    echo ==========================================
)

echo.
pause
