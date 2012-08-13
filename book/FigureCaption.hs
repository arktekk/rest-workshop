import Text.Pandoc
import Text.Pandoc.Pretty
import System.Environment (getArgs)

import Debug.Trace

handleRuby :: String -> Block -> Block
handleRuby "latex" (CodeBlock attr str) =
--  (trace $ show attr)
  case (lookup "caption" kv) of
	Nothing -> CodeBlock attr str
	Just caption -> RawBlock "latex" s
--           return $ flush ("\\begin{lstlisting}" <> printParams $$ text str $$
--                    "\\end{lstlisting}") $$ cr
                    where
                      s = render Nothing $ text "\\begin{lstlisting}" $$ cr $$
                          text ("\\caption{" ++ caption ++ "}") $$ cr $$
                          text str $$
                          text "\\end{lstlisting}" $$ cr
  where
    (id, classes, kv) = attr

--  Plain $ [Str "awesome!!"]
--  case format of
--       "html"   -> RawInline "html" $ "<ruby>" ++ kanji ++ "<rp>(</rp><rt>"
--                     ++ ruby ++ "</rt><rp>)</rp></ruby>"
--       "latex"  -> RawInline "latex" $ "\\ruby{" ++ kanji ++ "}{"
--                     ++ ruby ++ "}"
--       "kanji"  -> Str kanji
--       "kana"   -> Str ruby
--       _        -> Str ruby  -- default

handleRuby _ x = x

main :: IO ()
main = do
 args <- getArgs
 toJsonFilter $ handleRuby $ case args of
                              [f] -> f
                              _   -> error "usage: FigureCaption [ html | latex ]"
