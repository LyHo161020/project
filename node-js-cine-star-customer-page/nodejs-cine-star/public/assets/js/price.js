function renderPrice() {
    return str = `
        <tr data-seatstyle-id="{0}">
            <td>{1}</td>
            <td class="ticket-num">
                <a href="javascript:void(0);" class="minus">-</a>
                <input type="text" value="0" readonly="" size="3">
                <a href="javascript:void(0);" class="add">+</a>
            </td>
            <td class="ticket-price" data-price="{2}">{2}<sup>đ</sup></td>
            <td class="ticket-total"><span>0</span><sup>đ</sup></td>
        </tr>
    `;
}