; Parts of this are taken from https://github.com/JuliaEditorSupport/zed-julia under MIT License
(import_statement
  ["using" "import"] @context
  [
   (selected_import (_) @name ":" @context)
   (( [(identifier) (scoped_identifier) (import_path)] @name  "," @context)*
	  [(identifier) (scoped_identifier) (import_path)] @name)
  ]) @item

((module_definition
  "module" @start
  (identifier) @name
  "end" @end.after)
  (#set! role package)
)

(primitive_definition
  "primitive" @context
  "type" @context
  name: (identifier) @name) @item

(abstract_definition
  "abstract" @subtree
  "type" @subtree
  name: (identifier) @name
  (type_clause)? @subtree
  (#set! role type)
) 



((function_definition
  "function" @start
  (signature
	(call_expression
	  [
		(identifier) @name ; match foo()
		(field_expression _+ @context (identifier) .) @name ; match Base.foo()
	  ]
	  (argument_list
    )? )
	(_)* ; match the rest of the signature e.g., return_type and/or where_clause
  )
  "end" @end.after
  )
  (#set! role function)
)

; Match short function definitions like foo(x) = 2x.
; These don't have signatures so, we need to match eight different nested combinations
; of call_expressions with return types and/or where clauses.
(assignment
  .
  [
	; match `foo()` or `foo()::T` or `foo() where...` or `foo()::T where...`
	(call_expression (identifier) @name (argument_list) @subtree)
	(typed_expression . (call_expression (identifier)  (argument_list) @subtree) _+ @subtree) @name
	(where_expression . (call_expression (identifier)  (argument_list) @subtree) _+ @subtree) @name
	(where_expression . (typed_expression . (call_expression (identifier) @name (argument_list) @subtree) _+ @subtree) _+ @subtree)
	; match `Base.foo()` or `Base.foo()::T` or `Base.foo() where...` or `Base.foo()::T where...`
	(call_expression (field_expression _+ @subtree (identifier) .) @name (argument_list))
	(typed_expression . (call_expression (field_expression _+ @subtree (identifier) .) @name (argument_list) @subtree) _+ @subtree)
	(where_expression . (call_expression (field_expression _+ @subtree (identifier) .) @name (argument_list) @subtree) _+ @subtree)
	(where_expression . (typed_expression . (call_expression (field_expression _+ @subtree (identifier) .) @name (argument_list) @subtree) _+ @subtree) _+ @subtree)
  ] 
  (#set! role function)
)

(macro_definition
  "macro" @context
  (signature
	(call_expression
	  [
		(identifier) @name ; match foo()
		(field_expression _+ @context (identifier) @name .) ; match Base.foo()
	  ]
	  (argument_list)? @context)
	(_)* @context ; match the rest of the signature e.g., return_type
  )) @item

((struct_definition
  "mutable"?
  "struct"
  (identifier)? @name @start 
  "end" @end.after)
  (#set! role struct)
  ) 
(struct_definition
  "mutable"?
  "struct" 
  name: (_) @name 
  (function_definition) @start @end.after
  (#set! role constructor)
  ) 

(type_clause
  (#set! role category)
)

(const_statement
  "const" @start.before
  (assignment
	(_) @name @end.after
	(operator)
	(_))
	(#set! role constant)
)