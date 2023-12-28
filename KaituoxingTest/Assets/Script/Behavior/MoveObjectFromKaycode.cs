using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UIElements;

public class MoveObjectFromKaycode : MonoBehaviour
{
    public Transform p;

    public float speed = 0.1f;

    public Camera mainCamera;

    // Start is called before the first frame update
    void Start()
    {
        p = GameObject.FindGameObjectWithTag("Wall").transform;
        mainCamera=Camera.main;
        GameEventManager.OnKeyDown += KeycodeMove;
    }

    private void KeycodeMove(KeyCode keycode, Vector2 vector2)
    {
        Vector2 screenPixelPosition = new Vector2(Mathf.Lerp(0, Screen.width, vector2.x),
            Mathf.Lerp(0, Screen.height, vector2.y));
        Vector3 worldPosition = mainCamera.ScreenToWorldPoint(screenPixelPosition);
        Vector3 newPosition = new Vector3(worldPosition.x, worldPosition.y, p.transform.position.z);
        p.transform.DOMove(newPosition, speed);


        // // 计算移动方向向量
        // Vector3 direction = worldPosition -  p.position;
        // direction.Normalize(); // 将方向向量归一化，使其成为单位向量
        // Debug.Log(direction);
    }

    // Update is called once per frame
    void Update()
    {
    }
}