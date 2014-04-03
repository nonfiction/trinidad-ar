---
id: navigation
partial: true
---
<div class="nav-toggle">
    <a href="#navigation">Navigation</a>
</div>

<ul id="navigation">
{{#navigation}}
    <li>
        <a href="{{{url}}}">
            {{title}}
            <i class="down-arrow"></i>
        </a>
    </li>
{{/navigation}}
</ul>
