using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SwingMotion : MonoBehaviour
{
    
    public float rotationSpeed = 100f;   // 旋转速度
    public float rotationAmplitude = 30f;   // 旋转振幅
    
    private float initialRotation;
    
    public Transform QTEimage;
    
    
    private void Start()
    {
        QTEimage = transform;
        initialRotation = QTEimage.rotation.eulerAngles.z;
    }

    // Update is called once per frame
    void Update()
    {
        // 计算旋转角度
        float rotationAngle =initialRotation + Mathf.Sin(Time.time * rotationSpeed) * rotationAmplitude;

        // 应用旋转角度
        QTEimage.rotation = Quaternion.Euler(0f, 0f, rotationAngle);
    }
}
