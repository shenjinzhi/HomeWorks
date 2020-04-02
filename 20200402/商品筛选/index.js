/*
 * 你的选择框 点击增加减少
 * 1、点击字体变蓝，添加进选择框，如果是同一类就在同一个框
 * 2、点击选择框上的，元素字体恢复，选择框中删除
 */
let choose = document.getElementById('choose'),
    type = document.getElementById('type'),
    lis = type.getElementsByTagName('li');
let y = 0
for (let i = 0; i < lis.length; i++) {
    lis[i].index = i;
    liOnclick(lis[i]);
    y = i;
}
let arr =[]
function liOnclick(li) {
    let as = li.getElementsByTagName('a');


    for (let j = 0; j < as.length; j++) {
        as[j].onclick = function () {
            //在选择框添加标签
            let mark = document.createElement('mark');
            mark.innerHTML = this.innerHTML;
            choose.innerHTML="你的选择:"
            arr[li.index]= mark ;
            for(let m=0;m<arr.length;m++){
                console.log(arr[m])
				if(arr[m]!==undefined){
					choose.appendChild(arr[m]);
				}
			}

            // 在标签框后面添加删除框
            let markA = document.createElement('a');
            markA.innerHTML = 'X';
            mark.appendChild(markA);
            //点击删除标签
            markA.onclick = function () {
                as[j].className = '';
                mark.style.display = 'none';
            }
            
            //选中某个标签时，让a的字体变色
            for (let n = 0; n < as.length; n++) {
                as[n].className = '';

            }
            this.className = "active";
        }

    }

}