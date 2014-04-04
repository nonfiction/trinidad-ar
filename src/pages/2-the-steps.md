---
id: '/page/the-steps'
---

<div class="block step-1"><div class="block-inner row">
    <div class="block-image col-md-4"></div>
    <div class="block-text col-md-8">{{> step_1 }}</div>
</div></div>

<div class="block step-2"><div class="block-inner row">
    <div class="block-image col-md-4"></div>
    <div class="block-text col-md-8">{{> step_2 }}</div>
</div></div>

<div class="block step-3"><div class="block-inner row">
    <div class="col-md-8">{{> step_3 }}</div>
    <div class="col-md-4 sidebar">{{> step_3_sidebar }}</div>
</div></div>

<div class="block next-steps"><div class="block-inner row">
    <div class="main col-md-8 col-md-push-4">
        {{> next_steps }}
    </div>
    <div class="steps-to-success col-md-12">
        <table>
            <tr class="step">
                <td class="title"><h4>Steps To Success</h4></td>
                <td class="arrow"></td>
                <td class="description"></td>
            </tr>
            {{#contents.steps_to_success.steps}}
                <tr class="step">
                    <td class="title">{{{title}}}</td>
                    <td class="arrow"><span class="inner"></span></td>
                    <td class="description">
                        {{{description}}}
                    </td>
                </tr>
            {{/contents.steps_to_success.steps}}
        </table>
    </div>
</div></div>
