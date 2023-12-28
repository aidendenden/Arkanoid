using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectRotator : MonoBehaviour
{
    public float rotationSpeed = 50f; // 旋转速度

    void Update()
    {
        // 获取物体的Transform组件
        Transform objectTransform = transform;

        // 在Y轴上进行旋转
        objectTransform.Rotate(Vector3.up, rotationSpeed * Time.deltaTime);
    }
}
