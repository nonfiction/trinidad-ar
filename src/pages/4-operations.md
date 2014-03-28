---
id: operations
---

<div class="ops-intro" id="operations_intro">
    {{{page.operations_intro.content}}}
</div>

<div class="ops-area-row">
    {{#page.operations_canada}}
        <div id="{{id}}" class="ops-col col-{{id}}">{{{content}}}</div>
    {{/page.operations_canada}}
    {{#page.operations_us}}
        <div id="{{id}}" class="ops-col col-{{id}}">{{{content}}}</div>
    {{/page.operations_us}}
    {{#page.operations_international}}
        <div id="{{id}}" class="ops-col col-{{id}}">{{{content}}}</div>
    {{/page.operations_international}}
</div>
