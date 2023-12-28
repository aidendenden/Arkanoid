using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScreenToWorldExample : MonoBehaviour
{
    public Transform t;
    private Camera mainCamera; // 主摄像机

    private void Start()
    {
        // 获取主摄像机的引用
        mainCamera = Camera.main;
    }

    private void Update()
    {
        // // 获取鼠标点击的屏幕位置
        // Vector3 mousePosition = Input.mousePosition;
        //
        // // 将屏幕位置转换为场景中的位置
        // Vector3 worldPosition = mainCamera.ScreenToWorldPoint(mousePosition);
        //
        // // 在控制台打印转换后的场景位置
        // Debug.Log("Screen Position: " + mousePosition + " | World Position: " + worldPosition);
        //
        // 获取鼠标在屏幕上的位置
        Vector3 mousePos = Input.mousePosition;

        // 将鼠标位置转换为世界坐标系中的位置
        Vector3 targetPos =
            Camera.main.ScreenToWorldPoint(new Vector3(mousePos.x, mousePos.y, Camera.main.transform.position.y));

        // 锁定物体的y轴旋转
        t.eulerAngles = new Vector3(0, 0, transform.eulerAngles.z);

        // 让物体在水平方向上朝向鼠标的位置
        t.LookAt(new Vector3(targetPos.x,targetPos.y ,t.position.z));
        
    }
}