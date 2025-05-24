// Auto-generated from TESTUD.TXT
const tdl = `
;===============================================================================
; TESTUD.TXT
; Created By: Pg on 2018-02-09 10:17, ID:
; Purpose: Experimental/debug TDL for testing HTTP/remote collection and function
;          logic in Tally. Demonstrates walking a remote collection and (optionally)
;          posting data to a local HTTP endpoint.
;===============================================================================

/*
[#field : eidesc]
;validate : $$cwcheck1

[function : cwCheck1]
;; {09.Feb.18 11:34} parameter : cwvalue : string
;; {09.Feb.18 11:34} 10 : log : ##cwvalue
;220 :action: http post : "http://localhost"

10 : walk collection : cwlocal
30 : end walk
40 : return : yes

[collection : cwlocal]
remote url : "http://localhost"
*/

`;
export default tdl;
