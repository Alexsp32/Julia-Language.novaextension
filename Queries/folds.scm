; Parts of this are taken from https://github.com/JuliaEditorSupport/zed-julia under MIT License

(module_definition	
	("module" @start
	"end" @end)
)
(struct_definition	
	("mutable"? "struct" (identifier) @start @subtree
	"end" @end.after)
)
(function_definition	
	("function" (signature)? @start 
	"end" @end.after)
)
(for_statement	
	("for" (for_binding) @start
	"end" @end)
)
(do_clause	
	("do" @start
	"end" @end.after)
)
(while_statement	
	("while" (binary_expression) @start
	"end" @end.after)
	(#set! role block)
)
(if_statement	
	("if" (binary_expression) @start
	"end" @end.after)
)
(macro_definition	
	("macro" (signature) @start
	"end" @end.after)
)

(const_statement
  "const" @start.before
  (assignment
	(_) @name @end.after
	(operator)
	(_))) @item

